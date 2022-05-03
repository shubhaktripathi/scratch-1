public with sharing class apiConnect {
   

            public void basicAuthCallout(){
                Http http= new Http(); 
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://stcom-c-dev-ed.my.salesforce.com/services/apexrest/ContactAPI/2');
            req.setMethod('GET');
            
            // Specify the required user name and password to access the endpoint
            // As well as the header and header information
        
            String username = 'shubham@psit.com';
            String password = 'ManalI@12340';
         
            Blob headerValue = Blob.valueOf(username + ':' + password);
            String authorizationHeader = 'Bearer ' +
            EncodingUtil.base64Encode(headerValue);
            req.setHeader('Authorization', 'Bearer !ARgAQLu3NXKDyzg_Y.EDQKlpj.8HejQzs6SFnCPK9srYA51vTgikddESL8qOkWReoR70e6dV46X9jMaCR4pAZBADFNcQ.8yb');
          
            // Create a new http object to send the request object
            // A response object is generated as a result of the request  
         
            
            HTTPResponse res = http.send(req);
            System.debug(res.getBody());
          }
       

}