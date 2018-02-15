CREATE TABLE [dbo].[Inscriptions] (
    [Id]          UNIQUEIDENTIFIER   CONSTRAINT [DF_Inscriptions_Id] DEFAULT (newid()) NOT NULL,
    [FirstName]   VARCHAR (80)       NULL,
    [LastName]    VARCHAR (80)       NULL,
    [Country]     VARCHAR (80)       NULL,
    [City]        VARCHAR (80)       NULL,
    [Address]     VARCHAR (200)      NULL,
    [Zip]         VARCHAR (200)      NULL,
    [State]       VARCHAR (200)      NULL,
    [charge_Id]   UNIQUEIDENTIFIER   NULL,
    [Email]       VARCHAR (200)      NOT NULL,
    [Status]      BIT                NULL,
    [Phone]       VARCHAR (80)       NOT NULL,
    [BirthDate]   DATETIMEOFFSET (7) NULL,
    [Biography]   VARCHAR (4000)     NULL,
    [Description] VARCHAR (80)       NULL,
    [Creation]    DATETIMEOFFSET (7) CONSTRAINT [DF_Inscriptions_Creation] DEFAULT (getdate()) NULL,
    [Updated]     DATETIMEOFFSET (7) NOT NULL,
    [UpdatedId]   UNIQUEIDENTIFIER   NULL,
    CONSTRAINT [PK_Inscriptions] PRIMARY KEY CLUSTERED ([Id] ASC)
);

