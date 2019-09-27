/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.simplevat.rest.expenses;

import com.simplevat.entity.Contact;
import com.simplevat.entity.Currency;
import com.simplevat.entity.Project;
import com.simplevat.entity.User;
import com.simplevat.entity.bankaccount.TransactionCategory;
import com.simplevat.entity.bankaccount.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author daynil
 */
@Data
public class ExpenseRestModel {

    private Integer expenseId;
    private BigDecimal expenseAmount;
    private Date expenseDate;
    private String expenseDescription;
    private String receiptNumber;
    private User user;
    private TransactionType transactionType;
    private TransactionCategory transactionCategory;
    private Currency currency;
    private Project project;
    private String receiptAttachmentPath;
    private String receiptAttachmentDescription;
    private Integer createdBy;
    private LocalDateTime createdDate;
    private Integer lastUpdatedBy;
    private LocalDateTime lastUpdateDate;
    private boolean deleteFlag = false;
    private MultipartFile attachmentFile;
    private String receiptAttachmentName;
    private String receiptAttachmentContentType;
//    private StreamedContent attachmentFileContent;
    private Integer versionNumber;
    private Integer paymentMode;
    private byte[] receiptAttachmentBinary;
    private List<ExpenseItemModel> expenseItem;
    private Contact expenseContact;
    private BigDecimal expenseSubtotal;
    private BigDecimal expenseVATAmount;
    private BigDecimal expenseAmountCompanyCurrency;
    private Integer flagView;
    private Integer userId;
    private Integer companyId;
    private Integer currencyCode;
    private BigDecimal totalAmount;

    public void addExpenseItem(@NonNull final ExpenseItemModel expenseItemModel) {
        if (null == this.expenseItem) {
            expenseItem = new ArrayList<>();
        }
        expenseItem.add(expenseItemModel);
    }
}
