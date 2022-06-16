export interface Menu {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: Menu[];
}
