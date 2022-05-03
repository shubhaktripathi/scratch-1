public with sharing class AccRelatedConC {

        @AuraEnabled(cacheable=true)
        public static List<AccountContactWrapper> getAllAccountWithContacts(){

       List<AccountContactWrapper> acList= new List<AccountContactWrapper>();

          List<Account> accList = [SELECT Id, Name,
          (SELECT Id, FirstName, LastName, Name, Email, Phone From Contacts LIMIT 1 )
          FROM Account];

          if(!accList.isEmpty()){}
          for(Account ac:accList){
            AccountContactWrapper aWrap= new AccountContactWrapper(ac);
            aWrap.acc=ac;
            aWrap.con=ac.Contacts;
            acList.add(aWrap);
          }
          return acList;
        }

        @AuraEnabled
        public static List<AccountContactWrapper> getContact(String conString){


          try {
            system.debug('1'+ conString);
            List<AccountContactWrapper> accList = (List<AccountContactWrapper>)JSON.deserialize(conString, List<AccountContactWrapper>.class);
            system.debug('2'+ conString);

            List<AccountContactWrapper> acli = new List<AccountContactWrapper>();
            List<Account> acc= new List<Account>();
                for(AccountContactWrapper aWrap:accList){
                  AccountContactWrapper a= new AccountContactWrapper();
                  a.acc=aWrap.acc;
                  a.con=aWrap.con;
                  a.IsSelected=aWrap.IsSelected;
                  acli.add(a);

                }
                system.debug(acli);
                return acli;

              }
                  catch (Exception e) {
                        throw new AuraHandledException(e.getMessage());
        }

        }

        //////////////WRAPPER CLASS////////////////////

          public class AccountContactWrapper{

            @AuraEnabled
            public Account acc {get;set;}

            @AuraEnabled
            public List<Contact> con {get;set;}

            @AuraEnabled
            public Boolean IsSelected {get;set;}

            public AccountContactWrapper(){

            }

            public AccountContactWrapper(Account acc){
              this.isSelected = false;
              this.acc = acc;

            }
            public AccountContactWrapper(Account acc , Contact con, Boolean IsSelected){


            }

          }

        
      }