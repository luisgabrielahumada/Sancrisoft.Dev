CREATE TABLE [dbo].[Charges] (
    [Id]        UNIQUEIDENTIFIER   CONSTRAINT [DF_Charges_Id] DEFAULT (newid()) NOT NULL,
    [Name]      VARCHAR (50)       NULL,
    [Status]    BIT                CONSTRAINT [DF_Chages_IsActive] DEFAULT ((1)) NULL,
    [Creation]  DATETIMEOFFSET (7) CONSTRAINT [DF_Chages_Creation] DEFAULT (getdate()) NULL,
    [Updated]   DATETIMEOFFSET (7) NULL,
    [UpdatedId] UNIQUEIDENTIFIER   CONSTRAINT [DF_Charges_UpdatedId] DEFAULT (newid()) NULL,
    CONSTRAINT [PK_Chages] PRIMARY KEY CLUSTERED ([Id] ASC)
);

