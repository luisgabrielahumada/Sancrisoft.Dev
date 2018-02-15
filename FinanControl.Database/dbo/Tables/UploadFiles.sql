CREATE TABLE [dbo].[UploadFiles] (
    [Id]          UNIQUEIDENTIFIER   CONSTRAINT [DF_UploadFiles_Id] DEFAULT (newid()) NOT NULL,
    [Token]       UNIQUEIDENTIFIER   NULL,
    [Type]        VARCHAR (1000)     NULL,
    [Description] VARCHAR (1000)     NULL,
    [Name]        VARCHAR (1000)     NOT NULL,
    [Body]        NVARCHAR (MAX)     NOT NULL,
    [Status]      BIT                CONSTRAINT [DF_UploadFiles_Status] DEFAULT ((1)) NOT NULL,
    [Creation]    DATETIMEOFFSET (7) CONSTRAINT [DF_UploadFiles_Creation] DEFAULT (getdate()) NULL,
    [Updated]     DATETIMEOFFSET (7) CONSTRAINT [DF_UploadFiles_Updated] DEFAULT (getdate()) NULL,
    [UpdatedId]   UNIQUEIDENTIFIER   NULL,
    CONSTRAINT [PK_UploadFiles] PRIMARY KEY CLUSTERED ([Id] ASC)
);

