import { useState } from 'react';
import { PastActivities } from './PastActivities';
import { FutureActivities } from './FutureActivities';
import { LogActivityModal } from './LogActivityModal';
import { ScheduleActivityModal } from './ScheduleActivityModal';

export function ClientActivities() {
  const [showLogActivity, setShowLogActivity] = useState(false);
  const [showScheduleActivity, setShowScheduleActivity] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Past Activities */}
      <div className="space-y-6">
        <PastActivities onLogActivity={() => setShowLogActivity(true)} />
      </div>

      {/* Future Activities */}
      <div className="space-y-6">
        <FutureActivities onScheduleActivity={() => setShowScheduleActivity(true)} />
      </div>

      {/* Modals */}
      <LogActivityModal
        isOpen={showLogActivity}
        onClose={() => setShowLogActivity(false)}
      />

      <ScheduleActivityModal
        isOpen={showScheduleActivity}
        onClose={() => setShowScheduleActivity(false)}
      />
    </div>
  );
}