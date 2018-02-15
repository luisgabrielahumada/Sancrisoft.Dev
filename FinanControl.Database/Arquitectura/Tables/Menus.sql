CREATE TABLE [Arquitectura].[Menus] (
    [Id]           UNIQUEIDENTIFIER   DEFAULT (newsequentialid()) NOT NULL,
    [Page]         NVARCHAR (250)     NOT NULL,
    [Name]         NVARCHAR (250)     NOT NULL,
    [Parent]       UNIQUEIDENTIFIER   NOT NULL,
    [Vertical]     INT                NOT NULL,
    [Horizontal]   INT                NOT NULL,
    [IsParent]     BIT                NOT NULL,
    [IsParentMenu] BIT                NOT NULL,
    [Icon]         NVARCHAR (50)      NULL,
    [Status]       BIT                NOT NULL,
    [Creation]     DATETIMEOFFSET (7) NULL,
    [Updated]      DATETIMEOFFSET (7) NULL,
    [UpdatedId]    UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Arquitectura.Menus] PRIMARY KEY CLUSTERED ([Id] ASC)
);

