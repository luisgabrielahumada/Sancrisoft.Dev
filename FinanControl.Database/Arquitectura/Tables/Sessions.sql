CREATE TABLE [Arquitectura].[Sessions] (
    [Id]        UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [User]      UNIQUEIDENTIFIER   NOT NULL,
    [Session]   UNIQUEIDENTIFIER   NOT NULL,
    [Status]    BIT                NOT NULL,
    [Creation]  DATETIMEOFFSET (7) NULL,
    [Updated]   DATETIMEOFFSET (7) NULL,
    [UpdatedId] UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Arquitectura.Sessions] PRIMARY KEY CLUSTERED ([Id] ASC)
);

