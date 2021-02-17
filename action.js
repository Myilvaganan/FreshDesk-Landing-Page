const contentUp = document.querySelector('.content-up');
const contentDown = document.querySelector('.content-down');
const logo= document.querySelector('.logo img');

const sectionOneOptions ={ rootMargin : "-200px 0px 0px 0px"};

const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            contentUp.classList.add('nav-scroll-bg-change');
            logo.setAttribute('src','https://freshdesk.com/static-assets/images/common/company/logos/logo-fdesk-black.svg');

        }else{
             contentUp.classList.remove('nav-scroll-bg-change');
             logo.setAttribute('src','https://freshdesk.com/static-assets/images/common/company/logos/logo-fdesk-white.svg');
        }
    })
}, sectionOneOptions);

sectionOneObserver.observe(contentDown);




const showTickets = document.querySelector(".show");







//GET  METHOD


showTickets.addEventListener('click',()=> {

    async function freshdesk(){
        try{
            let domain_Name= 'newaccount1613468278935';
            let API_KEY= 'y5JVEbmxXd48bwvsEbrr';
            let url = `https://${domain_Name}.freshdesk.com/api/v2/tickets/`;
            let arr;

            let response = await fetch(url,
                {   
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(API_KEY + ":X")
                    },
                })

            let data= await response.json();
                arr=[];
                for(let i=0;i<data.length;i++){
                    arr.push([data[i].id, 
                              data[i].status, 
                              data[i].priority, 
                              data[i].source, 
                              data[i].subject
                            ]);
                }
        
             console.log(data);
            console.log(arr); 
        
            
            for(let i=0; i<arr.length;i++){

                const tickets = document.createElement('div');
      
                    const subject = document.createElement('p');
                    subject.innerText = ` Person ${i+1} : Subject: ${arr[i][4]}`;

                    const status = document.createElement('p');

                    if(arr[i][1] == '2')
                    {
                        status.innerText= 'Status: Open';
                    }else if(arr[i][1] == '3'){
                        status.innerText= 'Status: Pending';
                    }else if(arr[i][1] == '4'){
                        status.innerText= 'Status: Resolved';
                    }else if(arr[i][1] == '5'){
                        status.innerText = 'Status: Closed'
                    }

                    const priority = document.createElement('p');
                    priority.innerText = `Subject: ${arr[i][2]}`;

                    const source = document.createElement('p');
                    source.innerText = `Subject: ${arr[i][3]}`;
                     tickets.append(subject, status, priority, source)

                document.querySelector('.ticket-list').append(tickets);
            }
 

        }catch(err){
            console.log(err)
        }
        
    }

    freshdesk();
})



