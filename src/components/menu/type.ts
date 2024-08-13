export interface MenuOption {
  key: string,
  title: string,
  checked: boolean,
  link: string,
  props?: any,
  children?: Array<MenuOption>
}