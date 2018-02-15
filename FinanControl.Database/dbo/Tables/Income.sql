CREATE TABLE [dbo].[Income] (
    [Id]               UNIQUEIDENTIFIER   CONSTRAINT [DF_Income_Id] DEFAULT (newsequentialid()) NOT NULL,
    [MonthlyIncome_Id] UNIQUEIDENTIFIER   NULL,
    [Name]             VARCHAR (150)      NULL,
    [Description]      VARCHAR (150)      NULL,
    [Value]            MONEY              NULL,
    [Status]           BIT                NOT NULL,
    [Creation]         DATETIMEOFFSET (7) CONSTRAINT [DF_Income_Creation] DEFAULT (getdate()) NULL,
    [Updated]          DATETIMEOFFSET (7) CONSTRAINT [DF_Income_Updated] DEFAULT (getdate()) NULL,
    [UpdatedId]        UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_Income] PRIMARY KEY CLUSTERED ([Id] ASC)
);

