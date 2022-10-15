import { TouchableOpacityProps, ViewProps } from 'react-native';

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
};

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

export interface GameProps extends TouchableOpacityProps {
  data: GameCardProps;
};

export interface HeadingProps extends ViewProps {
  title: string;
  subtitle: string;
};