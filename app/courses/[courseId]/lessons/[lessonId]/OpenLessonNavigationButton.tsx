'use client';

import { Button } from '@/components/ui/button';
import { PanelLeftOpen } from 'lucide-react';
import {
  useLessonNavigationState,
  useLessonNavigationStore,
} from '../lesson-navigation.store';

export const OperLessonNavigationButton = () => {
  const setState = useLessonNavigationStore((s) => s.setState);
  const state = useLessonNavigationState();

  if (state === 'sticky') return;

  return (
    <Button onClick={() => setState('open')} size="sm" variant="ghost">
      <PanelLeftOpen />
    </Button>
  );
};
