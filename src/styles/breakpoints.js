export const sizes = {
  mobileS:  320,
  mobileM:  375,
  mobileL:  425,
  tablet:   768,
  desktopS: 1024,
  desktopM: 1440,
  desktopL: 2160,
}

export const device = {
  mobileS:  `(min-width: ${sizes.mobileS}px)`,
  mobileM:  `(min-width: ${sizes.mobileM}px)`,
  mobileL:  `(min-width: ${sizes.mobileL}px)`,
  tablet:   `(min-width: ${sizes.tablet}px)`,
  desktopS: `(min-width: ${sizes.laptop}px)`,
  desktopM: `(min-width: ${sizes.laptopL}px)`,
  desktopL: `(min-width: ${sizes.desktop}px)`
};