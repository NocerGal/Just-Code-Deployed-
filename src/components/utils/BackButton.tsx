'use client';

import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from '../ui/button';

export const BackButton = (props: ButtonProps) => {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={(e) => {
        router.back();
        // Permet de rendre le boutton flexible et d'ajouter des fonctions si nécessaire. Par exemple d'envoyer un formulaire au clic du boutton, on pourra récupérer les datas avec e et réaliser d'autres actions.
        props?.onClick?.(e);
      }}
    />
  );
};
