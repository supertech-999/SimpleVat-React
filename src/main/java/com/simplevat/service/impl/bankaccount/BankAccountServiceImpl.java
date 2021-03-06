package com.simplevat.service.impl.bankaccount;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.simplevat.dao.bankaccount.BankAccountDao;
import com.simplevat.entity.Activity;
import com.simplevat.entity.bankaccount.BankAccount;
import com.simplevat.service.BankAccountService;
import org.apache.commons.lang3.StringUtils;

@Service("bankAccountService")
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class BankAccountServiceImpl extends BankAccountService {

    private static final String BANK_ACCOUNT = "BANK_ACCOUNT";

    @Autowired
    public BankAccountDao bankAccountDao;

    @Override
    public List<BankAccount> getBankAccounts() {
        return getDao().getBankAccounts();
    }

    @Override
    public List<BankAccount> getBankAccountByUser(int userId) {
        return bankAccountDao.getBankAccountByUser(userId);
    }

    @Override
    protected BankAccountDao getDao() {
        return this.bankAccountDao;
    }

    public void persist(BankAccount bankAccount) {
        super.persist(bankAccount, null, getActivity(bankAccount, "CREATED"));
    }

    public BankAccount update(BankAccount bankAccount) {
        return super.update(bankAccount, null, getActivity(bankAccount, "UPDATED"));
    }

    private Activity getActivity(BankAccount bankAccount, String activityCode) {
        Activity activity = new Activity();
        activity.setActivityCode(activityCode);
        activity.setModuleCode(BANK_ACCOUNT);
        activity.setField3("Bank Account " + activityCode.charAt(0) + activityCode.substring(1, activityCode.length()).toLowerCase());
        activity.setField1(bankAccount.getAccountNumber());
        activity.setField2(bankAccount.getBankName());
        activity.setLastUpdateDate(LocalDateTime.now());
        activity.setLoggingRequired(true);
        return activity;
    }

    @Override
    public BankAccount getBankAccountById(int id) {
        return bankAccountDao.getBankAccountById(id);
    }

    @Override
    public void deleteByIds(List<Integer> ids) {
        bankAccountDao.deleteByIds(ids);
    }
}
