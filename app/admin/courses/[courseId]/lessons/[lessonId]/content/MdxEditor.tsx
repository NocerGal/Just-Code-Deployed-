'use client';

import { useDebounceFn } from '@/hook/useDeboundFn';
import { lessionActionEditContent } from '../lesson.action';
import InitializedMDXEditor from './InitializedMDXEditor';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge, BadgeProps } from '@/components/ui/badge';

export type MdxEditorProps = {
  markdown: string;
  lessonId: string;
};

type SyncState = 'sync' | 'not-sync' | 'syncing';

const getBadgeVariant = (syncState: SyncState): BadgeProps['variant'] => {
  if (syncState === 'not-sync') {
    return 'destructive';
  }

  if (syncState === 'syncing') {
    return 'default';
  }

  return 'secondary';
};

export const MdxEditor = ({ lessonId, markdown }: MdxEditorProps) => {
  const [synchState, setSynchState] = useState<SyncState>('sync');

  const onChange = useDebounceFn(async (value: string) => {
    setSynchState('syncing');
    const { data, serverError } = await lessionActionEditContent({
      lessonId,
      markdown: value,
    });

    if (serverError) {
      toast.error(serverError);
      setSynchState('not-sync');
      return;
    }
    setSynchState('sync');
  });

  useEffect(() => {
    if (synchState === 'sync') return;

    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        'Are you sure you want to leave? All unsaved changes will be lost';
    };

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [synchState]);

  return (
    <div className="relative">
      <div className="absolute bottom-2 right-2">
        <Badge variant={getBadgeVariant(synchState)}>{synchState}</Badge>
      </div>
      <InitializedMDXEditor
        onChange={(v) => {
          setSynchState('not-sync');
          onChange(v);
        }}
        markdown={markdown}
      />
    </div>
  );
};
