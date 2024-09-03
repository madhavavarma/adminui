export interface INotifications {
    mainAlert: IMainAlert,
    headerMessage: string
}

export interface IMainAlert {
    type: string,
    message: string
}