
import { ProjectLink, NavItem } from './types';

export const COLORS = {
  primary: '#FF85A2',
  secondary: '#FFB7C5',
  accent: '#FCE4EC',
  dark: '#4A148C',
  bg: '#FFF5F7',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', url: '#' },
  { label: 'Projects', url: 'https://github.com/BlossomTheme' },
  { label: 'Documentation', url: 'https://blossomtheme.github.io/Docs/' },
  { label: 'Palette', url: 'https://github.com/BlossomTheme/BlossomTheme/tree/master/Palette' },
];

export const PROJECTS: ProjectLink[] = [
  {
    title: 'Visual Studio Code',
    description: 'Our flagship theme for VS Code, designed for long coding sessions.',
    url: 'https://blossomtheme.github.io/VSCode/',
    icon: '💻',
    color: '#FF85A2'
  },
  {
    title: 'Discord Theme',
    description: 'Transform your Discord workspace into a serene blossom garden.',
    url: 'https://blossomtheme.github.io/Discord/',
    icon: '💬',
    color: '#FFB7C5'
  },
  {
    title: 'Terminal / CLI',
    description: 'Hyper, Windows Terminal, and Alacritty configs for the aesthetics.',
    url: 'https://blossomtheme.github.io/Terminals/',
    icon: '⌨️',
    color: '#F48FB1'
  },
  {
    title: 'Firefox / Chrome',
    description: 'Browse the web through rose-colored glasses with our browser themes.',
    url: 'https://blossomtheme.github.io/Browsers/',
    icon: '🌐',
    color: '#F06292'
  }
];
