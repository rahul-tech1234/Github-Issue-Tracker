let currentTab = "all";
const issueCount = document.getElementById("issue-count");
const allContainer = document.getElementById("all-container");
const openContainer = document.getElementById("open-container");
const closeContainer = document.getElementById("close-container");
//issueCount.innerHTML = "";
const tabSwitch = (tab) => {
    //console.log(tab)
    const tabs = ["all", "open", "close"];
    for (let t of tabs) {
        const tabName = document.getElementById("tab-" + t);
        //console.log(tabName);
        if (t == tab) {
            tabName.classList.add("btn-primary");
        } else {
            tabName.classList.remove("btn-primary");
        }
    }

    const pages = [allContainer, openContainer, closeContainer];
    for (let page of pages) {
        page.classList.add("hidden");

        if (tab === "all") {
            allContainer.classList.remove("hidden");
        } else if (tab === "open") {
            openContainer.classList.remove("hidden");
            //console.log(page);
            const openLoad = async () => {
                manageSpinner(true);
                const tabName = document.getElementById("tab-" + tab);
                const res = await fetch(
                    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
                );
                const data = await res.json();
                console.log(data.data);

                displayOpen(data.data);
            };
            openLoad();
        } else {
            closeContainer.classList.remove("hidden");
            //console.log(page);
            const closeLoad = async () => {
                manageSpinner(true);
                const tabName = document.getElementById("tab-" + tab);
                const res = await fetch(
                    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
                );
                const data = await res.json();

                //console.log(data);
                displayclose(data.data);
            };
            closeLoad();
        }
    }
};
tabSwitch(currentTab);
const loadIssue = async () => {
    manageSpinner(true);
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    //console.log(data.data);
    displayIssue(data.data);
    //issueLength(data.data);
};
// const issueLength = (issue) => {
//     issueCount.innerText = issue.length + " Issues";
//     //console.log(issue);
// };
const loadIssueDetail = async (id) => {
    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const data = await res.json();
    //console.log(data.data);
    displayIssueDetail(data);
};
const displayIssueDetail = async (issues) => {
    console.log(issues.data.status);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `<div class="space-y-3">
                                <h3
                                    class="text-lg font-bold text-[#1F2937] text-[24px]"
                                >
                                    Fix broken image uploads
                                </h3>
                            </div>
                            <div class="flex justify-start gap-4 items-center space-y-3">
                                <p
                                    class="text-[#64748B] text-[12px] font-medium"
                                >
                                    Opened by Fahim Ahmed
                                </p>
                                <button
                                    class="border-none bg-[#00A96E] rounded-full text-white py-0 px-3"
                                >
                                    ${issues.data.status}
                                </button>
                                <p
                                    class="text-[#64748B] text-[12px] font-medium"
                                >
                                    22/02/2026
                                </p>
                            </div>
                            <div class="card-actions justify-between space-y-3">
                                <button
                                    class="px-4 py-1 text-[14px] rounded-2xl font-medium bg-red-100 text-[red]"
                                >
                                    BUG
                                </button>
                                <button
                                    class="px-4 py-1 text-[14px] rounded-2xl bg-yellow-100 text-[#D97706]"
                                >
                                    help wanted
                                </button>
                            </div>
                            <p class="text-[#64748B] text-[16px] font-medium">
                                The navigation menu doesn't collapse properly on
                                mobile devices. Need to fix the responsive
                                behavior.
                            </p>
                            <div
                                class="space-y-3 card w-full bg-base-100 card-xs shadow-sm"
                            >
                                <div class="flex justify-start gap-25 p-3 space-y-3">
                                    <div class="space-y-5">
                                        <p
                                            class="text-[#64748B] text-[16px] font-medium"
                                        >
                                            Assignee:
                                        </p>
                                        <h3
                                            class="text-[#1F2937] text-[16px] font-semibold"
                                        >
                                            Fahim Ahmed
                                        </h3>
                                    </div>
                                    <div class="space-y-5">
                                        <p
                                            class="text-[#64748B] text-[16px] font-medium"
                                        >
                                            Priority
                                        </p>

                                        <button
                                            class="border-none bg-[#EF4444] rounded-full text-white py-0 px-3"
                                        >
                                            ${issues.data.priority}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">Close</button>
                                </form>
                            </div>`;
    document.getElementById("issue_modal").showModal();
};
const displayIssue = (issues) => {
    allContainer.innerHTML = "";
    issues.forEach((issue) => {
        issueCount.innerText = issues.length + " Issues";
        //console.log(issue.id);
        // console.log(issue.priority)
        const card = document.createElement("div");
        card.innerHTML = `<div class="card card-border bg-base-100 shadow">
                    <div class="${issue.status == "open" ? "border-t-4 border-[#00A96E] rounded-xl" : "border-t-4 border-[#A855F7] rounded-xl"}">
                        <div class="card-body rounded-xl p-4">
                            <div class="flex justify-between">
                                
                                    <img 
                                    src="${issue.priority == "high" || issue.priority == "medium" ? "../assets/Open-Status.png" : "../assets/Closed- Status .png"}"
                                    
                                    />
                                
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl ${issue.priority == "high" ? "bg-red-100 font-medium" : issue.priority == "medium" ? "bg-yellow-100 text-[#D97706]" : "bg-gray-200 text-[#64748B]"} "
                                >
                                    ${issue.priority}
                                </button>
                            </div>
                            <p class="text-[#1F2937] text-[14px] font-semibold">
                                Fix navigation menu on mobile devices
                            </p>
                            <p class="text-[#64748B] text-12 font-normal">
                                The navigation menu doesn't collapse properly on
                                mobile devices...
                            </p>
                            <div class="card-actions justify-between">
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl font-medium bg-red-100 text-[red]"
                                >
                                    BUG
                                </button>
                                <button
                                onclick="loadIssueDetail(${issue.id})"
                                    class="px-4 py-0 text-[14px] rounded-2xl bg-yellow-100 text-[#D97706]"
                                >
                                    help wanted
                                </button>
                            </div>
                        </div>
                        <hr class="border border-[#E4E4E7]" />
                        <div class="p-4 space-y-2">
                            <p class="text-[#64748B] text-[14px]">
                                #1 by john_doe
                            </p>
                            <p class="text-[#64748B] text-[14px]">1/15/2024</p>
                        </div>
                    </div>
                </div>`;
        allContainer.append(card);
    });
    manageSpinner(false);
};
const displayOpen = (issues) => {
    openContainer.innerHTML = "";
    const openIssues = issues.filter((issue) => issue.status === "open");
    issueCount.innerHTML = openIssues.length + " Issues";
    issues.forEach((issue) => {
        //console.log(issue);
        const openCard = document.createElement("div");
        openCard.innerHTML = `<div class="card card-border bg-base-100 shadow">
                    <div class="${issue.status == "open" ? "border-t-4 border-[#00A96E] rounded-xl" : "border-t-4 border-[#A855F7] rounded-xl"}">
                        <div class="card-body rounded-xl p-4">
                            <div class="flex justify-between">
                                
                                    <img 
                                    src="${issue.priority == "high" || issue.priority == "medium" ? "../assets/Open-Status.png" : "../assets/Closed- Status .png"}"
                                    
                                    />
                                
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl ${issue.priority == "high" ? "bg-red-100 font-medium" : issue.priority == "medium" ? "bg-yellow-100 text-[#D97706]" : "bg-gray-200 text-[#64748B]"} "
                                >
                                    ${issue.priority}
                                </button>
                            </div>
                            <p class="text-[#1F2937] text-[14px] font-semibold">
                                Fix navigation menu on mobile devices
                            </p>
                            <p class="text-[#64748B] text-12 font-normal">
                                The navigation menu doesn't collapse properly on
                                mobile devices...
                            </p>
                            <div class="card-actions justify-between">
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl font-medium bg-red-100 text-[red]"
                                >
                                    BUG
                                </button>
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl bg-yellow-100 text-[#D97706]"
                                    onclick="loadIssueDetail(${issue.id})"
                                >
                                    help wanted
                                </button>
                            </div>
                        </div>
                        <hr class="border border-[#E4E4E7]" />
                        <div class="p-4 space-y-2">
                            <p class="text-[#64748B] text-[14px]">
                                #1 by john_doe
                            </p>
                            <p class="text-[#64748B] text-[14px]">1/15/2024</p>
                        </div>
                    </div>
                </div>`;
        if (issue.status == "open") {
            openContainer.appendChild(openCard);
            //issueLength(issue.length);
            //console.log(issue);
        }
    });
    manageSpinner(false);
};
const displayclose = (issues) => {
    closeContainer.innerHTML = "";
    const closedIssues = issues.filter((issue) => issue.status === "closed");
    issueCount.innerHTML = closedIssues.length + " Issues";
    issues.forEach((issue) => {
        //console.log(issue.status);
        const closeCard = document.createElement("div");
        closeCard.innerHTML = `<div class="card card-border bg-base-100 shadow">
                    <div class=" border-t-4  ${issue.status == "closed" ? "border-[#A855F7]" : "border-[#00A96E]"}   rounded-xl">
                        <div class="card-body rounded-xl p-4">
                            <div class="flex justify-between">
                                
                                    <img 
                                    src="${issue.priority == "high" || issue.priority == "medium" ? "../assets/Open-Status.png" : "../assets/Closed- Status .png"}"
                                    
                                    />
                                
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl ${issue.priority == "high" ? "bg-red-100 font-medium" : issue.priority == "medium" ? "bg-yellow-100 text-[#D97706]" : "bg-gray-200 text-[#64748B]"} " 
                                >
                                    ${issue.priority}
                                </button>
                            </div>
                            <p class="text-[#1F2937] text-[14px] font-semibold">
                                Fix navigation menu on mobile devices
                            </p>
                            <p class="text-[#64748B] text-12 font-normal">
                                The navigation menu doesn't collapse properly on
                                mobile devices...
                            </p>
                            <div class="card-actions justify-between">
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl font-medium bg-red-100 text-[red]"
                                >
                                    BUG
                                </button>
                                <button
                                    class="px-4 py-0 text-[14px] rounded-2xl bg-yellow-100 text-[#D97706]"
                                    onclick="loadIssueDetail(${issue.id})"
                                >
                                    help wanted
                                </button>
                            </div>
                        </div>
                        <hr class="border border-[#E4E4E7]" />
                        <div class="p-4 space-y-2">
                            <p class="text-[#64748B] text-[14px]">
                                #1 by john_doe
                            </p>
                            <p class="text-[#64748B] text-[14px]">1/15/2024</p>
                        </div>
                    </div>
                </div>`;
        if (issue.status == "closed") {
            closeContainer.appendChild(closeCard);
        }
    });
    manageSpinner(false);
};
const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        allContainer.classList.add("hidden");
        openContainer.classList.add("hidden");
        closeContainer.classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        allContainer.classList.remove("hidden");
        openContainer.classList.remove("hidden");
        closeContainer.classList.remove("hidden");
    }
};
loadIssue();
document.getElementById("btn-search").addEventListener("click",()=>{
    const inputSearch = document.getElementById("input-search");
    const searchValue = inputSearch.value.trim().toLowerCase();
    console.log(searchValue);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>{
        const allIssue=data.data;
        console.log(allIssue);
        const filterIssue=allIssue.filter(issue=>issue.data.toLowerCase().includes(searchValue))
    })
});