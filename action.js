const contentUp = document.querySelector(".content-up");
const contentDown = document.querySelector(".content-down");
const logo = document.querySelector(".logo img");

const sectionOneOptions = { rootMargin: "-350px 0px 0px 0px" };

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      contentUp.classList.add("nav-scroll-bg-change");
      logo.setAttribute(
        "src",
        "https://freshdesk.com/static-assets/images/common/company/logos/logo-fdesk-black.svg"
      );
    } else {
      contentUp.classList.remove("nav-scroll-bg-change");
      logo.setAttribute(
        "src",
        "https://freshdesk.com/static-assets/images/common/company/logos/logo-fdesk-white.svg"
      );
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(contentDown);

const showTickets = document.querySelector(".show");

//GET  METHOD

showTickets.addEventListener("click", () => {
  async function freshdesk() {
    try {
      let domain_Name = "newaccount1613468278935";
      let API_KEY = "y5JVEbmxXd48bwvsEbrr";
      let url = `https://${domain_Name}.freshdesk.com/api/v2/tickets/`;
      let arr;

      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(API_KEY + ":X"),
        },
      });

      let data = await response.json();
      arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push([
          data[i].id,
          data[i].status,
          data[i].priority,
          data[i].source,
          data[i].subject,
        ]);
      }

      let classChange = document.querySelector(".ticket-list");
      classChange.style.display = "flex";

      for (let i = 0; i < arr.length; i++) {
        var row = document.createElement("tr");
        row.setAttribute("class", "table-row");
        var rowHead = document.createElement("th");
        var rowData1 = document.createElement("td");
        rowData1.setAttribute("class", "font-weight-bold");
        var rowData2 = document.createElement("td");
        var rowData3 = document.createElement("td");
        var rowData4 = document.createElement("td");

        rowHead.innerText = `${arr[i][0]}`;
        rowData1.innerText = `${arr[i][4]}`;

        if (arr[i][1] == "2") {
          rowData3.innerText = "Open";
        } else if (arr[i][1] == "3") {
          rowData3.innerText = "Pending";
        } else if (arr[i][1] == "4") {
          rowData3.innerText = "Resolved";
        } else if (arr[i][1] == "5") {
          rowData3.innerText = "Closed";
        }

        if (arr[i][2] == "1") {
          rowData4.innerText = "Low";
        } else if (arr[i][2] == "2") {
          rowData4.innerText = "Medium";
        } else if (arr[i][2] == "3") {
          rowData4.innerText = "High";
        } else if (arr[i][2] == "4") {
          rowData4.innerText = "Urgent";
        }

        if (arr[i][3] == "1") {
          rowData2.innerText = "Email";
        } else if (arr[i][3] == "2") {
          rowData2.innerText = "Portal";
        } else if (arr[i][3] == "3") {
          rowData2.innerText = "Phone";
        } else if (arr[i][3] == "7") {
          rowData2.innerText = "Chat";
        } else if (arr[i][3] == "9") {
          rowData2.innerText = "Feedback Widget";
        } else if (arr[i][3] == "10") {
          rowData2.innerText = "Outbound Mail";
        }

        row.append(rowHead, rowData1, rowData2, rowData3, rowData4);

        document.querySelector(".table-body").append(row);
      }
    } catch (err) {
      console.log(err);
    }
  }

  freshdesk();
});
