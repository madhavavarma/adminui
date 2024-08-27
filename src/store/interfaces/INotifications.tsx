export interface INotifications {
    mainAlert: IMainAlert
}

export interface IMainAlert {
    type: string,
    message: string
}