CREATE TABLE [dbo].[Expenses] (
    [Id]                 UNIQUEIDENTIFIER   CONSTRAINT [DF_Expenses_Id] DEFAULT (newsequentialid()) NOT NULL,
    [MonthlyExpenses_Id] UNIQUEIDENTIFIER   NULL,
    [Name]               VARCHAR (150)      NULL,
    [Description]        VARCHAR (150)      NULL,
    [Value]              MONEY              NULL,
    [Status]             BIT                NOT NULL,
    [Creation]           DATETIMEOFFSET (7) CONSTRAINT [DF_Expenses_Creation] DEFAULT (getdate()) NULL,
    [Updated]            DATETIMEOFFSET (7) CONSTRAINT [DF_Expenses_Updated] DEFAULT (getdate()) NULL,
    [UpdatedId]          UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Expenses] PRIMARY KEY CLUSTERED ([Id] ASC)
);

