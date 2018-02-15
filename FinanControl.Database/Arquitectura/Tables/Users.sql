CREATE TABLE [Arquitectura].[Users] (
    [Id]            UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [UserName]      NVARCHAR (80)      NOT NULL,
    [Password]      NVARCHAR (50)      NOT NULL,
    [FirstName]     NVARCHAR (250)     NOT NULL,
    [LastName]      NVARCHAR (250)     NOT NULL,
    [Email]         NVARCHAR (250)     NOT NULL,
    [PasswordReset] NVARCHAR (50)      NULL,
    [Parent]        UNIQUEIDENTIFIER   NOT NULL,
    [Expiration]    DATETIMEOFFSET (7) NOT NULL,
    [IsBlock]       BIT                NOT NULL,
    [IsSysAdmin]    BIT                NOT NULL,
    [Profile_Id]    UNIQUEIDENTIFIER   NULL,
    [Status]        BIT                NOT NULL,
    [Creation]      DATETIMEOFFSET (7) NULL,
    [Updated]       DATETIMEOFFSET (7) NULL,
    [UpdatedId]     UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Arquitectura.Users] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Arquitectura.Users_Arquitectura.Profiles_Profile_Id] FOREIGN KEY ([Profile_Id]) REFERENCES [Arquitectura].[Profiles] ([Id])
);

