CREATE TABLE [dbo].[Cities] (
    [Id]         UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Name]       NVARCHAR (250)     NOT NULL,
    [Code]       NVARCHAR (50)      NOT NULL,
    [Country_Id] UNIQUEIDENTIFIER   NOT NULL,
    [Status]     BIT                NOT NULL,
    [Creation]   DATETIMEOFFSET (7) NULL,
    [Updated]    DATETIMEOFFSET (7) NULL,
    [UpdatedId]  UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_dbo.Cities] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.Cities_dbo.Countries_Country_Id] FOREIGN KEY ([Country_Id]) REFERENCES [dbo].[Countries] ([Id])
);

