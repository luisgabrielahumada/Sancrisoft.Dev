CREATE TABLE [Arquitectura].[Parameters] (
    [Id]          UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Code]        NVARCHAR (50)      NOT NULL,
    [Name]        NVARCHAR (100)     NOT NULL,
    [Value]       NVARCHAR (100)     NULL,
    [IsBlock]     BIT                NOT NULL,
    [Control]     NVARCHAR (50)      NULL,
    [Observation] NVARCHAR (250)     NULL,
    [Type]        NVARCHAR (50)      NULL,
    [Title]       NVARCHAR (80)      NULL,
    [Width]       INT                NOT NULL,
    [Status]      BIT                NOT NULL,
    [Creation]    DATETIMEOFFSET (7) NULL,
    [Updated]     DATETIMEOFFSET (7) NULL,
    [UpdatedId]   UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Arquitectura.Parameters] PRIMARY KEY CLUSTERED ([Id] ASC)
);

