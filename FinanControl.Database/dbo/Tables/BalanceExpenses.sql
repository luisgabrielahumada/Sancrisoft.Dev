CREATE TABLE [dbo].[BalanceExpenses] (
    [Id]              UNIQUEIDENTIFIER   CONSTRAINT [DF_BalanceExpenses_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Expenses_Id]     UNIQUEIDENTIFIER   NULL,
    [BalanceSheet_Id] UNIQUEIDENTIFIER   NULL,
    [TypePayment]     INT                NULL,
    [IsPayment]       BIT                NULL,
    [Name]            VARCHAR (150)      NULL,
    [Description]     VARCHAR (150)      NULL,
    [Month]           INT                NULL,
    [Value]           MONEY              NULL,
    [Status]          BIT                NOT NULL,
    [Creation]        DATETIMEOFFSET (7) NULL,
    [Updated]         DATETIMEOFFSET (7) NULL,
    [UpdatedId]       UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_BalanceExpenses] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_BalanceExpenses_BalanceSheet] FOREIGN KEY ([BalanceSheet_Id]) REFERENCES [dbo].[BalanceSheet] ([Id]),
    CONSTRAINT [FK_BalanceExpenses_Expenses] FOREIGN KEY ([Expenses_Id]) REFERENCES [dbo].[Expenses] ([Id])
);

