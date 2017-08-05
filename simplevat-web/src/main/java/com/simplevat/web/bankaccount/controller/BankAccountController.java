package com.simplevat.web.bankaccount.controller;

import java.util.ArrayList;
import java.util.List;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.simplevat.entity.Country;
import com.simplevat.entity.Currency;
import com.simplevat.entity.User;
import com.simplevat.entity.bankaccount.BankAccount;
import com.simplevat.entity.bankaccount.BankAccountStatus;
import com.simplevat.service.CountryService;
import com.simplevat.service.CurrencyService;
import com.simplevat.service.bankaccount.BankAccountService;
import com.simplevat.service.bankaccount.BankAccountStatusService;
import com.simplevat.web.bankaccount.model.BankAccountModel;
import com.simplevat.web.utils.FacesUtil;
import java.io.Serializable;
import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Scope;

@Controller
@Scope("view")
public class BankAccountController extends BankAccountHelper implements Serializable {

    @Autowired
    private BankAccountService bankAccountService;

    @Autowired
    private BankAccountStatusService bankAccountStatusService;

    @Autowired
    private CurrencyService currencyService;

    @Autowired
    private CountryService countryService;

    @Getter
    @Setter
    private BankAccount selectedBankAccount;

    /**
     * @return List<BankAccount>
     *
     * Return list of all banks
     */
    @PostConstruct
    public void init() {
        Object objSelectedBankAccountId = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap().get(FacesUtil.REQUEST_KEY_BANK_ACCOUNT);;
        System.out.println("selected :" + objSelectedBankAccountId);
        if (objSelectedBankAccountId != null) {

            selectedBankAccount = bankAccountService.findByPK(Integer.parseInt(objSelectedBankAccountId.toString()));
        } else {
            this.selectedBankAccount = new BankAccount();
            Currency defaultCurrency = currencyService.getDefaultCurrency();
            if (defaultCurrency != null) {
                this.selectedBankAccount.setBankAccountCurrency(defaultCurrency);
            }

            Country defaultCountry = countryService.getDefaultCountry();
            if (defaultCountry != null) {
                this.selectedBankAccount.setBankCountry(defaultCountry);
            }
        }
    }

    public List<BankAccount> populateAccountDetails() {
        List<BankAccount> banks = new ArrayList<>(0);
        try {
            banks = bankAccountService.getBankAccounts();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return banks;
    }

    public String createBankAccount() {
//        this.selectedBankAccount = new BankAccount();
//        Currency defaultCurrency = currencyService.getDefaultCurrency();
//        if (defaultCurrency != null) {
//            this.selectedBankAccount.setBankAccountCurrency(defaultCurrency);
//        }
//
//        Country defaultCountry = countryService.getDefaultCountry();
//        if (defaultCountry != null) {
//            this.selectedBankAccount.setBankCountry(defaultCountry);
//        }

        return "edit-bankaccount?faces-redirect=true";
    }

    public String editBankAccount() {
        System.out.println("selectedBankAccount.getBankAccountId() :" + selectedBankAccount.getBankAccountId());
        // FacesUtil.setSelectedBankAccountIntoFlash(FacesContext.getCurrentInstance(), String.valueOf(selectedBankAccount.getBankAccountId()));
        return "edit-bankaccount?faces-redirect=true&REQUEST_SELECTED_BANK_ACCOUNT=" + selectedBankAccount.getBankAccountId();
    }

    public String saveBankAccount() {
        try {
            User loggedInUser = FacesUtil.getLoggedInUser();
            selectedBankAccount.setCreatedBy(loggedInUser.getUserId());

            if (selectedBankAccount.getBankAccountStatus() != null) {
                BankAccountStatus bankAccountStatus = bankAccountStatusService
                        .getBankAccountStatus(selectedBankAccount.getBankAccountStatus().getBankAccountStatusCode());
                selectedBankAccount.setBankAccountStatus(bankAccountStatus);
            }
            if (selectedBankAccount.getBankAccountCurrency() != null) {
                Currency currency = currencyService
                        .getCurrency(selectedBankAccount.getBankAccountCurrency().getCurrencyCode());
                selectedBankAccount.setBankAccountCurrency(currency);
            }

            if (selectedBankAccount.getBankAccountId() == null || selectedBankAccount.getBankAccountId() == 0) {
                selectedBankAccount.setCurrentBalance(selectedBankAccount.getOpeningBalance());
                BankAccountStatus bankAccountStatus = bankAccountStatusService.getBankAccountStatusByName("ACTIVE");
                selectedBankAccount.setBankAccountStatus(bankAccountStatus);
            }
            if (selectedBankAccount.getBankAccountId() == null) {
                bankAccountService.persist(selectedBankAccount);
            }
            bankAccountService.update(selectedBankAccount, selectedBankAccount.getBankAccountId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("BankAccount saved successfully"));
        return "/pages/secure/bankaccount/bankaccounts.xhtml?faces-redirect=true";

    }

    public void saveAndContinueBankAccount() {
        try {
            selectedBankAccount.setCreatedBy(12345);

            if (selectedBankAccount.getBankAccountStatus() != null) {
                BankAccountStatus bankAccountStatus = bankAccountStatusService.getBankAccountStatus(selectedBankAccount.getBankAccountStatus().getBankAccountStatusCode());
                selectedBankAccount.setBankAccountStatus(bankAccountStatus);
            }
            if (selectedBankAccount.getBankAccountCurrency() != null) {
                Currency currency = currencyService.getCurrency(selectedBankAccount.getBankAccountCurrency().getCurrencyCode());
                selectedBankAccount.setBankAccountCurrency(currency);
            }
            if (selectedBankAccount.getBankAccountId() == null || selectedBankAccount.getBankAccountId() == 0) {
                selectedBankAccount.setCurrentBalance(selectedBankAccount.getOpeningBalance());
                BankAccountStatus bankAccountStatus = bankAccountStatusService.getBankAccountStatusByName("ACTIVE");
                selectedBankAccount.setBankAccountStatus(bankAccountStatus);
            }
            bankAccountService.persist(selectedBankAccount, 0);
        } catch (Exception e) {
            e.printStackTrace();
        }

        setSelectedBankAccount(new BankAccount());
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("BankAccount saved successfully"));
    }

    public String deleteBankAccount() {
        selectedBankAccount.setDeleteFlag(true);
        bankAccountService.delete(selectedBankAccount, selectedBankAccount.getBankAccountId());
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage("BankAccount deleted successfully"));
        return "/pages/secure/bankaccount/bankaccounts.xhtml?faces-redirect=true";
    }

    public String redirectToTransaction() {
        FacesUtil.setSelectedBankAccount(getBankAccountModel(selectedBankAccount));
        return "bank-transactions?faces-redirect=true";
    }

    public List<BankAccountStatus> bankAccountStatuses(final String searchQuery) {
        return bankAccountStatusService.getBankAccountStatuses();
    }

}
