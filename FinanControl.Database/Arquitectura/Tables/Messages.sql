CREATE TABLE [Arquitectura].[Messages] (
    [Id]          UNIQUEIDENTIFIER   CONSTRAINT [DF_Messages_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Message]     VARCHAR (MAX)      NULL,
    [Description] VARCHAR (MAX)      NULL,
    [Code]        INT                NULL,
    [Status]      BIT                NULL,
    [Creation]    DATETIMEOFFSET (7) NULL,
    [Updated]     DATETIMEOFFSET (7) NULL,
    [UpdatedId]   UNIQUEIDENTIFIER   NULL,
    CONSTRAINT [PK_Messages] PRIMARY KEY CLUSTERED ([Id] ASC)
);

