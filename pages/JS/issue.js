let currentTab = "all";
const issueCount = document.getElementById("issue-count");
const allContainer = document.getElementById("all-container");
const openContainer = document.getElementById("open-container");
const closeContainer = document.getElementById("close-container");
issueCount.innerHTML = "";
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
            //console.log(page);
            //loadIssue();
        } else if (tab === "open") {
            openContainer.classList.remove("hidden");
            //console.log(page);
            const openLoad = async () => {
                const tabName = document.getElementById("tab-" + tab);
                const res = await fetch(
                    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
                );
                const data = await res.json();
                //console.log(data);
                displayOpen(data.data);
                //issueLength(data.data.length);
            };
            openLoad();
        } else {
            closeContainer.classList.remove("hidden");
            //console.log(page);
            const closeLoad = async () => {
                const tabName = document.getElementById("tab-" + tab);
                const res = await fetch(
                    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
                );
                const data = await res.json();

                //console.log(data);
                displayclose(data);
            };
            closeLoad();
        }
    }
};
tabSwitch(currentTab);
const loadIssue = async () => {
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    //console.log(data.data);
    displayIssue(data.data);
    issueLength(data.data);
};
const issueLength = (issue) => {
    issueCount.innerText = issue.length + " Issues";
    //console.log(issue);
};
const displayIssue = (issues) => {
    allContainer.innerHTML = "";
    issues.forEach((issue) => {
        //console.log(issue.length);
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
};
const displayOpen = (issues) => {
    openContainer.innerHTML = "";
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
};
const displayclose = (issues) => {
    closeContainer.innerHTML = "";
    issues.data.forEach((issue) => {
        //console.log(issue.status);
        const closeCard = document.createElement("div");
        closeCard.innerHTML = `<div class="card card-border bg-base-100 shadow">
                    <div class="${issue.status == "close" ? "border-t-4 border-[#A855F7] rounded-xl" : "border-t-4 border-[#00A96E] rounded-xl"}">
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
        if (issue.status == "close") {
            closeContainer.appendChild(closeCard);
            //console.log("close");
            // const chk = `${issue.status} == "close"`;
            // console.log(!!chk)
        }
    });
};
loadIssue();

// {id: 41, title: 'Dashboard widgets not loading', description: 'Some dashboard widgets fail to load intermittently. Getting CORS errors in console.', status: 'open', labels: Array(1), …}
