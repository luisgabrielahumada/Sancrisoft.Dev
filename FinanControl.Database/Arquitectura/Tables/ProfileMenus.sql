CREATE TABLE [Arquitectura].[ProfileMenus] (
    [Id]         UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [IsView]     BIT                NOT NULL,
    [IsNew]      BIT                NOT NULL,
    [IsEdit]     BIT                NOT NULL,
    [IsStatus]   BIT                NOT NULL,
    [IsModify]   BIT                NOT NULL,
    [IsSpecial]  BIT                NOT NULL,
    [IsDelete]   BIT                NOT NULL,
    [Menu_Id]    UNIQUEIDENTIFIER   NOT NULL,
    [Profile_Id] UNIQUEIDENTIFIER   NOT NULL,
    [Status]     BIT                NOT NULL,
    [Creation]   DATETIMEOFFSET (7) NULL,
    [Updated]    DATETIMEOFFSET (7) NULL,
    [UpdatedId]  UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Arquitectura.ProfileMenus] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Arquitectura.ProfileMenus_Arquitectura.Menus_Menu_Id] FOREIGN KEY ([Menu_Id]) REFERENCES [Arquitectura].[Menus] ([Id]),
    CONSTRAINT [FK_Arquitectura.ProfileMenus_Arquitectura.Profiles_Profile_Id] FOREIGN KEY ([Profile_Id]) REFERENCES [Arquitectura].[Profiles] ([Id])
);

