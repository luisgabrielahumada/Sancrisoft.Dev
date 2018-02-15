CREATE TABLE [Arquitectura].[Profiles] (
    [Id]        UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Name]      NVARCHAR (50)      NOT NULL,
    [Code]      NVARCHAR (50)      NOT NULL,
    [IsBlock]   BIT                NOT NULL,
    [Status]    BIT                NOT NULL,
    [Creation]  DATETIMEOFFSET (7) NULL,
    [Updated]   DATETIMEOFFSET (7) NULL,
    [UpdatedId] UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Arquitectura.Profiles] PRIMARY KEY CLUSTERED ([Id] ASC)
);

