import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { BoldIcon, ItalicIcon, ListIcon, Icon } from '@/icons';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof Icon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu = ({ editor, ...rest }: EditorBubbleMenuProps) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => !!editor?.isActive('bold'),
      command: () => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => !!editor?.isActive('italic'),
      command: () => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'list',
      isActive: () => !!editor?.isActive('list'),
      command: () => editor?.chain().focus().toggleBulletList().run(),
      icon: ListIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...rest,
    shouldShow: ({ state }) => {
      const { selection } = state;
      const { empty } = selection;

      if (empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
    },
  };

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} {...bubbleMenuProps}>
      {items.map((item, index) => (
        <button key={index} onClick={item.command} type="button">
          <item.icon boxSize={6}>{item.name}</item.icon>
        </button>
      ))}
    </BubbleMenu>
  );
};
