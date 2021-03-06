package com.simplevat.service;

import com.simplevat.entity.Contact;
import com.simplevat.entity.ContactView;
import java.util.List;
import java.util.Optional;

/**
 * Created by mohsin on 3/3/2017.
 */
public abstract class ContactService extends SimpleVatService<Integer, Contact> {

    public abstract List<Contact> getContacts(Integer pageIndex, Integer noOfRecorgs);

    public abstract List<Contact> getContacts();

    public abstract List<ContactView> getContactViewList();

    public abstract List<Contact> getContacts(final String searchQuery, int ContactType);

    public abstract Contact getContact(int id);

    public abstract Optional<Contact> getContactByEmail(String Email);

    public abstract Contact getLastContact();

    public abstract void deleleByIds(List<Integer> ids);

}
