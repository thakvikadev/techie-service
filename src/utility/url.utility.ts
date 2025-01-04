import { isEmpty } from 'class-validator';
import * as path from 'path';
import { toBoolean } from './utils';

/**
 * Create url of base url with paths
 * @param path string of paths
 * @returns string of full url
 */
export const toUrl = (path: string) => {
  if (isEmpty(path)) {
    return null;
  }
  return new URL(path, process.env.BASE_URL).toString();
};

/**
 * Generate full attachment's url
 * @param uuid attachment uuid
 * @returns a file url
 */
export const toFileUrl = (uuid: string) => {
  if (isEmpty(uuid)) {
    return null;
  }
  return new URL(
    path.join(process.env.PATH_ATTACHMENT_FILES, uuid),
    process.env.BASE_ATTACHMENT_URL,
  ).toString();
};

/**
 * Generate full attachment's preview url
 * @param uuid attachment uuid
 * @returns a file url
 */
export const toPreviewUrl = (uuid: string, size?: number, square = false) => {
  if (isEmpty(uuid)) {
    return null;
  }
  const url = new URL(
    path.join(process.env.PATH_ATTACHMENT_FILES, uuid, 'preview'),
    process.env.BASE_ATTACHMENT_URL,
  ).toString();
  return `${url}?${new URLSearchParams({
    size: size || parseInt(process.env.ICON_PROFILE_SIZE, 10) || 64,
    square: square || toBoolean(process.env.ICON_PROFILE_SQUARE, true),
  } as Record<string, any>)}`;
};

/**
 * Generate full user profile url or default
 * @param user user's object
 * @returns url
 */
export const toProfileUrl = (user: {
  gender?: string;
  fullName: string;
  profile: string;
  resize?: boolean;
}) => {
  if (!user.profile) {
    return getDefaultProfile(user);
  }
  return user.resize ? toPreviewUrl(user.profile) : toFileUrl(user.profile);
};

export const getDefaultProfile = (user: {
  gender?: string;
  fullName: string;
}) => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}&backgroundType=solid,gradientLinear`;
};
