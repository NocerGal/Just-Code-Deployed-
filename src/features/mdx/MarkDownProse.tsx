import MarkDown from 'react-markdown';

export type MarkDownProseProps = {
  markdown: string;
};

export const MarkDownProse = (props: MarkDownProseProps) => {
  return (
    <MarkDown className="prose dark:prose-invert lg:prose-lg">
      {props.markdown}
    </MarkDown>
  );
};
