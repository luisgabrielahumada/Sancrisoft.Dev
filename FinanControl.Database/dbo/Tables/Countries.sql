CREATE TABLE [dbo].[Countries] (
    [Id]        UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Name]      NVARCHAR (250)     NOT NULL,
    [Code]      NVARCHAR (50)      NOT NULL,
    [Status]    BIT                NOT NULL,
    [Creation]  DATETIMEOFFSET (7) NULL,
    [Updated]   DATETIMEOFFSET (7) NULL,
    [UpdatedId] UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_dbo.Countries] PRIMARY KEY CLUSTERED ([Id] ASC)
);

