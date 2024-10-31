export const getMode = (mode: string) => {
    switch(mode) {
        case 'edit': return 'E';
        case 'create': return 'C';
        case 'view': return 'V';
        case 'delete': return 'D';
        default: return "";
    }
}