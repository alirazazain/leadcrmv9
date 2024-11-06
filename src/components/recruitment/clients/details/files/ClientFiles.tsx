import { useState } from 'react';
import { FolderPlus, Upload } from 'lucide-react';
import { FileExplorer } from './FileExplorer';
import { CreateFolderModal } from './CreateFolderModal';
import { UploadFilesModal } from './UploadFilesModal';
import { RenameItemModal } from './RenameItemModal';
import { DeleteConfirmationDialog } from '../../../../common/DeleteConfirmationDialog';
import { FileItem, FolderItem } from '../../../../../types/files';
import { Client } from '../../../../../types/recruitment';

interface ClientFilesProps {
  client: Client;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientFiles({ client, onUpdate }: ClientFilesProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadFiles, setShowUploadFiles] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FileItem | FolderItem | null>(null);

  const handleCreateFolder = (name: string) => {
    const newFolder: FolderItem = {
      id: crypto.randomUUID(),
      type: 'folder',
      name,
      path: [...currentPath],
      createdAt: new Date().toISOString(),
      items: []
    };

    const updatedFiles = addItemToPath(client.files || [], currentPath, newFolder);
    onUpdate({ files: updatedFiles });
    setShowCreateFolder(false);
  };

  const handleUploadFiles = (files: File[]) => {
    const newFiles: FileItem[] = files.map(file => ({
      id: crypto.randomUUID(),
      type: 'file',
      name: file.name,
      path: [...currentPath],
      size: file.size,
      mimeType: file.type,
      url: URL.createObjectURL(file),
      createdAt: new Date().toISOString()
    }));

    const updatedFiles = addItemsToPath(client.files || [], currentPath, newFiles);
    onUpdate({ files: updatedFiles });
    setShowUploadFiles(false);
  };

  const handleRename = (newName: string) => {
    if (!selectedItem) return;

    const updatedFiles = updateItemInPath(
      client.files || [],
      selectedItem.path,
      selectedItem.id,
      { ...selectedItem, name: newName }
    );

    onUpdate({ files: updatedFiles });
    setShowRenameModal(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    const updatedFiles = removeItemFromPath(
      client.files || [],
      selectedItem.path,
      selectedItem.id
    );

    onUpdate({ files: updatedFiles });
    setShowDeleteDialog(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Files</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateFolder(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </button>
          <button
            onClick={() => setShowUploadFiles(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </button>
        </div>
      </div>

      <FileExplorer
        files={client.files || []}
        currentPath={currentPath}
        onPathChange={setCurrentPath}
        onRename={(item) => {
          setSelectedItem(item);
          setShowRenameModal(true);
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setShowDeleteDialog(true);
        }}
      />

      <CreateFolderModal
        isOpen={showCreateFolder}
        onClose={() => setShowCreateFolder(false)}
        onSubmit={handleCreateFolder}
        currentPath={currentPath}
      />

      <UploadFilesModal
        isOpen={showUploadFiles}
        onClose={() => setShowUploadFiles(false)}
        onUpload={handleUploadFiles}
        currentPath={currentPath}
      />

      <RenameItemModal
        isOpen={showRenameModal}
        onClose={() => {
          setShowRenameModal(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        onSubmit={handleRename}
      />

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedItem(null);
        }}
        onConfirm={handleDelete}
        title={`Delete ${selectedItem?.type === 'folder' ? 'Folder' : 'File'}`}
        message={`Are you sure you want to delete ${
          selectedItem?.type === 'folder' ? 'this folder and all its contents' : 'this file'
        }? This action cannot be undone.`}
      />
    </div>
  );
}

// Helper functions for managing nested file structure
function addItemToPath(
  items: (FileItem | FolderItem)[],
  path: string[],
  newItem: FileItem | FolderItem
): (FileItem | FolderItem)[] {
  if (path.length === 0) {
    return [...items, newItem];
  }

  const [currentFolder, ...remainingPath] = path;
  return items.map(item => {
    if (item.type === 'folder' && item.name === currentFolder) {
      return {
        ...item,
        items: addItemToPath(item.items, remainingPath, newItem)
      };
    }
    return item;
  });
}

function addItemsToPath(
  items: (FileItem | FolderItem)[],
  path: string[],
  newItems: (FileItem | FolderItem)[]
): (FileItem | FolderItem)[] {
  if (path.length === 0) {
    return [...items, ...newItems];
  }

  const [currentFolder, ...remainingPath] = path;
  return items.map(item => {
    if (item.type === 'folder' && item.name === currentFolder) {
      return {
        ...item,
        items: addItemsToPath(item.items, remainingPath, newItems)
      };
    }
    return item;
  });
}

function updateItemInPath(
  items: (FileItem | FolderItem)[],
  path: string[],
  itemId: string,
  updatedItem: FileItem | FolderItem
): (FileItem | FolderItem)[] {
  if (path.length === 0) {
    return items.map(item => 
      item.id === itemId ? updatedItem : item
    );
  }

  const [currentFolder, ...remainingPath] = path;
  return items.map(item => {
    if (item.type === 'folder' && item.name === currentFolder) {
      return {
        ...item,
        items: updateItemInPath(item.items, remainingPath, itemId, updatedItem)
      };
    }
    return item;
  });
}

function removeItemFromPath(
  items: (FileItem | FolderItem)[],
  path: string[],
  itemId: string
): (FileItem | FolderItem)[] {
  if (path.length === 0) {
    return items.filter(item => item.id !== itemId);
  }

  const [currentFolder, ...remainingPath] = path;
  return items.map(item => {
    if (item.type === 'folder' && item.name === currentFolder) {
      return {
        ...item,
        items: removeItemFromPath(item.items, remainingPath, itemId)
      };
    }
    return item;
  });
}