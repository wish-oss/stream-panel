import { IconButton, IconButtonProps } from '@/components/chakra';
import { useColorMode } from '@/hooks';
import { MoonIcon, SunIcon } from '@/icons';

export type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { colorMode, setColorMode } = useColorMode();

  const handleToggleMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      aria-label="Toggle Color Mode"
      variant="ghost"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon color="gray" />}
      onClick={handleToggleMode}
      {...props}
    />
  );
};
