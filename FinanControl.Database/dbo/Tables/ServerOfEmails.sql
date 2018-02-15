CREATE TABLE [dbo].[ServerOfEmails] (
    [Id]                 UNIQUEIDENTIFIER   CONSTRAINT [DF_ServerOfEmails_Id] DEFAULT (newid()) NOT NULL,
    [Host]               VARCHAR (80)       NULL,
    [Port]               INT                NULL,
    [IsEnableSSl]        BIT                NULL,
    [IsUseCredencial]    BIT                NULL,
    [User]               VARCHAR (80)       NULL,
    [Password]           VARCHAR (80)       NULL,
    [EmailAdministrator] VARCHAR (80)       NULL,
    [IsDefault]          BIT                NULL,
    [Status]             BIT                NULL,
    [Creation]           DATETIMEOFFSET (7) CONSTRAINT [DF_ServerOfEmails_Creation] DEFAULT (getdate()) NULL,
    [Updated]            DATETIMEOFFSET (7) NULL,
    [UpdatedId]          UNIQUEIDENTIFIER   CONSTRAINT [DF_ServerOfEmails_UpdatedId] DEFAULT (newid()) NULL,
    [WebSite]            VARCHAR (280)      NULL,
    CONSTRAINT [PK_ServerOfEmails] PRIMARY KEY CLUSTERED ([Id] ASC)
);

