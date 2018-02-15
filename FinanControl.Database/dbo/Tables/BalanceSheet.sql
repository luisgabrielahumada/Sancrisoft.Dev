CREATE TABLE [dbo].[BalanceSheet] (
    [Id]        UNIQUEIDENTIFIER   CONSTRAINT [DF_BalanceSheet_Id] DEFAULT (newsequentialid()) NOT NULL,
    [Month]     INT                NULL,
    [Year]      INT                NULL,
    [Islock]    BIT                CONSTRAINT [DF_BalanceSheet_IsBlock] DEFAULT ((0)) NULL,
    [Status]    BIT                NOT NULL,
    [Creation]  DATETIMEOFFSET (7) CONSTRAINT [DF_BalanceSheet_Creation] DEFAULT (getdate()) NULL,
    [Updated]   DATETIMEOFFSET (7) CONSTRAINT [DF_BalanceSheet_Updated] DEFAULT (getdate()) NULL,
    [UpdatedId] UNIQUEIDENTIFIER   NOT NULL,
    CONSTRAINT [PK_BalanceSheet] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_BalanceSheet]
    ON [dbo].[BalanceSheet]([Month] ASC, [Year] ASC);

