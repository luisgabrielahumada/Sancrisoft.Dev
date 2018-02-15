CREATE TABLE [dbo].[MonthsExpenses] (
    [Id]          UNIQUEIDENTIFIER   CONSTRAINT [DF_MonthsExpenses_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Expenses_Id] UNIQUEIDENTIFIER   NULL,
    [Month]       BIGINT             NULL,
    [Status]      BIT                NOT NULL,
    [Creation]    DATETIMEOFFSET (7) CONSTRAINT [DF_MonthsExpenses_Creation] DEFAULT (getdate()) NULL,
    [Updated]     DATETIMEOFFSET (7) CONSTRAINT [DF_MonthsExpenses_Updated] DEFAULT (getdate()) NULL,
    [UpdatedId]   UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_MonthsExpenses] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_MonthsExpenses_Expenses] FOREIGN KEY ([Expenses_Id]) REFERENCES [dbo].[Expenses] ([Id]),
    CONSTRAINT [IX_MonthsExpenses] UNIQUE NONCLUSTERED ([Id] ASC, [Month] ASC)
);

