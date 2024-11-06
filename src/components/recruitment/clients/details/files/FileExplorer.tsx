import { useState } from 'react';
import { ChevronRight, Folder, File, MoreVertical, ChevronLeft } from 'lucide-react';
import { FileItem, FolderItem } from '../../../../../types/files';
import { formatFileSize, getFileIcon } from '../../../../../utils/files';
import { format } from 'date-fns';

interface FileExplorerProps {
  files: (FileItem | FolderItem)[];
  currentPath: string[];
  onPathChange: (path: string[]) => void;
  onRename: (item: FileItem | FolderItem) => void;
  onDelete: (item: FileItem | FolderItem) => void;
}

export function FileExplorer({
  files,
  currentPath,
  onPathChange,
  onRename,
  onDelete
}: FileExplorerProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getCurrentItems = () => {
    let current = files;
    for (const folder of currentPath) {
      const foundFolder = current.find(
        item => item.type === 'folder' && item.name === folder
      ) as FolderItem;
      if (!foundFolder) return [];
      current = foundFolder.items;
    }
    return current;
  };

  const handleItemClick = (item: FileItem | FolderItem) => {
    if (item.type === 'folder') {
      onPathChange([...currentPath, item.name]);
    } else {
      // Handle file click (preview, download, etc.)
      window.open(item.url, '_blank');
    }
  };

  const handleBack = () => {
    onPathChange(currentPath.slice(0, -1));
  };

  const currentItems = getCurrentItems();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Breadcrumb Navigation */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
        {currentPath.length > 0 && (
          <button
            onClick={handleBack}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={() => onPathChange([])}
          className={`text-sm ${
            currentPath.length === 0
              ? 'font-medium text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Files
        </button>
        {currentPath.map((folder, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <button
              onClick={() => onPathChange(currentPath.slice(0, index + 1))}
              className={`text-sm ${
                index === currentPath.length - 1
                  ? 'font-medium text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {folder}
            </button>
          </div>
        ))}
      </div>

      {/* File List */}
      <div className="divide-y divide-gray-200">
        {currentItems.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-500">
            This folder is empty
          </div>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="group px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center space-x-3">
                {item.type === 'folder' ? (
                  <Folder className="h-5 w-5 text-gray-400" />
                ) : (
                  getFileIcon(item.name)
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(item.createdAt), 'MMM d, yyyy')}
                    {item.type === 'file' && ` · ${formatFileSize(item.size)}`}
                  </p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(selectedItem === item.id ? null : item.id);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {selectedItem === item.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRename(item);
                        setSelectedItem(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item);
                        setSelectedItem(null);
                      }}
                      className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}