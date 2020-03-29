import { COLOR } from './theme'

export const VERY_DARK = {
  normal: COLOR.VERY_DARK_RED,
  risk: COLOR.VERY_DARK_RED,
  infected: COLOR.VERY_DARK_GREEN,
  healed: COLOR.VERY_DARK_RED,
}

export const NORMAL = {
  normal: COLOR.BLUE,
  risk: COLOR.BUTTER,
  infected: COLOR.COPPER,
  healed: COLOR.MINT,
}

export const DARK = {
  normal: COLOR.DARK_BLUE,
  risk: COLOR.DARK_BUTTER,
  infected: COLOR.DARK_COPPER,
  healed: COLOR.DARK_MINT,
}

export const LIGHT = {
  normal: COLOR.PALE_BLUE,
  risk: COLOR.PALE_BUTTER,
  infected: COLOR.PALE_COPPER,
  healed: COLOR.PALE_MINT,
}

export const TEXT = {
  normal: 'สุขภาพปกติ',
  risk: 'กำลังเฝ้าระวัง',
  infected: 'มีเชื้อ COVID-19',
  healed: 'รักษาหายแล้ว',
  fetching: 'โหลดสถานะสุขภาพ',
}

export const SHORT_TEXT = {
  NORMAL: 'ปกติ',
  RISK: 'เฝ้าระวัง',
  INFECTED: 'มีเชื้อ',
  HEALED: 'หายแล้ว',
}

export const STATUS = {
  normal: 'normal',
  risk: 'risk',
  infected: 'infected',
  healed: 'healed',
}
