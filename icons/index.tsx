'use client';

import { Icon, IconProps as P } from '@/components/chakra';

import {
  MdOutlineWorkspacePremium as MdPremium,
  MdFormatListBulleted,
  MdDataExploration,
  MdFormatItalic,
  MdInsertChart,
  MdFormatBold,
  MdStarBorder,
  MdDashboard,
  MdFilterAlt,
  MdBarChart,
  MdBusiness,
  MdFlashOn,
  MdPalette,
  MdPreview,
  MdLogout,
  MdFlag,
  MdSave,
  MdStar,
} from 'react-icons/md';
import { LuRefreshCw, LuStickyNote } from 'react-icons/lu';
import { DiGoogleCloudPlatform } from 'react-icons/di';
import { FaGithub, FaGlobe } from 'react-icons/fa6';
import { BiSolidCommentAdd } from 'react-icons/bi';
import { TbBrandTypescript } from 'react-icons/tb';
import { FaAws, FaGoogle } from 'react-icons/fa';
import { AiOutlineEnter } from 'react-icons/ai';
import { TbBrandNextjs } from 'react-icons/tb';
import { BsThreeDots } from 'react-icons/bs';
import { SiChakraui } from 'react-icons/si';
import { FcFlashOn } from 'react-icons/fc';
import { SiPrisma } from 'react-icons/si';
import { HiUsers } from 'react-icons/hi2';

export * from '@chakra-ui/icons';

// Company logos, for demo
export const AwsLogo = (p: P) => <Icon as={FaAws} {...p} />;
export const ChakraLogo = (p: P) => <Icon as={SiChakraui} {...p} />;
export const GcpLogo = (p: P) => <Icon as={DiGoogleCloudPlatform} {...p} />;
export const GoogleLogo = (p: P) => <Icon as={FaGoogle} {...p} />;
export const NextLogo = (p: P) => <Icon as={TbBrandNextjs} {...p} />;
export const PrismaLogo = (p: P) => <Icon as={SiPrisma} {...p} />;
export const TypescriptLogo = (p: P) => <Icon as={TbBrandTypescript} {...p} />;

export const AddCommentIcon = (p: P) => <Icon as={BiSolidCommentAdd} {...p} />;
export const BarChartIcon = (p: P) => <Icon as={MdBarChart} {...p} />;
export const BoldIcon = (p: P) => <Icon as={MdFormatBold} {...p} />;
export const Business = (p: P) => <Icon as={MdBusiness} {...p} />;
export const DashboardIcon = (p: P) => <Icon as={MdDashboard} {...p} />;
export const DataExploration = (p: P) => <Icon as={MdDataExploration} {...p} />;
export const EnterIcon = (p: P) => <Icon as={AiOutlineEnter} {...p} />;
export const FilterIcon = (p: P) => <Icon as={MdFilterAlt} {...p} />;
export const FlagIcon = (p: P) => <Icon as={MdFlag} {...p} />;
export const FlashIcon = (p: P) => <Icon as={MdFlashOn} {...p} />;
export const YellowFlashIcon = (p: P) => <Icon as={FcFlashOn} {...p} />;
export const GithubIcon = (p: P) => <Icon as={FaGithub} {...p} />;
export const GlobeIcon = (p: P) => <Icon as={FaGlobe} {...p} />;
export const InsertChartIcon = (p: P) => <Icon as={MdInsertChart} {...p} />;
export const ItalicIcon = (p: P) => <Icon as={MdFormatItalic} {...p} />;
export const ListIcon = (p: P) => <Icon as={MdFormatListBulleted} {...p} />;
export const LogoutIcon = (p: P) => <Icon as={MdLogout} {...p} />;
export const PaletteIcon = (p: P) => <Icon as={MdPalette} {...p} />;
export const PreviewIcon = (p: P) => <Icon as={MdPreview} {...p} />;
export const RefreshIcon = (p: P) => <Icon as={LuRefreshCw} {...p} />;
export const SaveIcon = (p: P) => <Icon as={MdSave} {...p} />;
export const StarBorderIcon = (p: P) => <Icon as={MdStarBorder} {...p} />;
export const StarIcon = (p: P) => <Icon as={MdStar} {...p} />;
export const StickyNoteIcon = (p: P) => <Icon as={LuStickyNote} {...p} />;
export const ThreeDotsIcon = (p: P) => <Icon as={BsThreeDots} {...p} />;
export const UsersIcon = (p: P) => <Icon as={HiUsers} {...p} />;
export const PremiumIcon = (p: P) => <Icon as={MdPremium} color="blue" {...p} />;
