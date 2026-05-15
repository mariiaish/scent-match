import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: Parameters<typeof classNames>) => twMerge(classNames(...args));
