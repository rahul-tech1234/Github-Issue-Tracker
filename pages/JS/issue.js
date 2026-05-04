let currentTab = "all";
let allIssuesData = [];

const issueCount = document.getElementById("issue-count");
const allContainer = document.getElementById("all-container");
const openContainer = document.getElementById("open-container");
const closeContainer = document.getElementById("close-container");

const tabSwitch = (tab) => {
    currentTab = tab;
    const tabs = ["all", "open", "close"];
    tabs.forEach((t) => {
        const tabName = document.getElementById("tab-" + t);
        tabName.classList.toggle("btn-primary", t === tab);
    });

    renderIssues();
};

const loadIssue = async () => {
    manageSpinner(true);

    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();

    allIssuesData = data.data;

    renderIssues();
};

const renderIssues = (filteredData = null) => {
    const data = filteredData || allIssuesData;

    allContainer.innerHTML = "";
    openContainer.innerHTML = "";
    closeContainer.innerHTML = "";

    let displayData = data;

    if (currentTab === "open") {
        displayData = data.filter((i) => i.status === "open");
    } else if (currentTab === "close") {
        displayData = data.filter((i) => i.status === "closed");
    }

    issueCount.innerText = displayData.length + " Issues";

    displayData.forEach((issue) => {
        const card = createCard(issue);

        if (currentTab === "all") {
            allContainer.append(card);
        } else if (currentTab === "open") {
            openContainer.append(card);
        } else {
            closeContainer.append(card);
        }
    });

    showActiveContainer();
    manageSpinner(false);
};

const createCard = (issue) => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div class="card card-border bg-base-100 shadow" onclick="loadIssueDetail(${issue.id})">
        <div class="${issue.status === "open" ? "border-t-4 border-[#00A96E]" : "border-t-4 border-[#A855F7]"} rounded-xl">
            <div class="card-body rounded-xl p-4">
                <div class="flex justify-between">
                    <img 
                        src="${
                            issue.priority === "low"
                                ? "../assets/Closed- Status .png"
                                : "../assets/Open-Status.png"
                        }"
                    />
                    <button class="px-4 py-0 text-[14px] rounded-2xl
                        ${
                            issue.priority === "high"
                                ? "bg-red-100"
                                : issue.priority === "medium"
                                  ? "bg-yellow-100 text-[#D97706]"
                                  : "bg-gray-200"
                        }">
                        ${issue.priority}
                    </button>
                </div>

                <p class="text-[#1F2937] text-[14px] font-semibold">
                    ${issue.title}
                </p>

                <p class="text-[#64748B] text-12">
                    ${issue.description}
                </p>






<div class="card-actions justify-between my-2">
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

            <div class="p-4">
                <p class="text-[#64748B] text-[14px]">
                    #${issue.id} by ${issue.assignee}
                </p>
                <p class="text-[#64748B] text-[14px]">
                    ${issue.updatedAt}
                </p>
            </div>
        </div>
    </div>
    `;

    return card;
};

const showActiveContainer = () => {
    allContainer.classList.add("hidden");
    openContainer.classList.add("hidden");
    closeContainer.classList.add("hidden");

    if (currentTab === "all") {
        allContainer.classList.remove("hidden");
    } else if (currentTab === "open") {
        openContainer.classList.remove("hidden");
    } else {
        closeContainer.classList.remove("hidden");
    }
};

const loadIssueDetail = async (id) => {
    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const data = await res.json();

    displayIssueDetail(data.data);
};

const displayIssueDetail = (issue) => {
    const detailsContainer = document.getElementById("details-container");
    console.log(issue);

    detailsContainer.innerHTML = `


    <h3
                                    class="text-lg font-bold text-[#1F2937] text-[24px]"
                                >
                                    ${issue.title}
                                </h3> 
                                
                                


                                <div class="flex justify-start gap-4 items-center space-y-3">
                                <p
                                    class="text-[#64748B] text-[12px] font-medium"
                                >
                                    Opened by Fahim Ahmed
                                </p>
                                <button
                                    class="border-none bg-[#00A96E] rounded-full text-white py-0 px-3 pb-1"
                                >
                                    ${issue.status}
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


                            <p class="text-[#64748B] text-[16px] font-medium">${issue.description}</p>




 <div
                                class="space-y-3 card w-full bg-base-100 card-xs shadow-sm my-3"
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
                                            Rahul Das
                                        </h3>
                                    </div>
                                    <div class="space-y-5">
                                        <p
                                            class="text-[#64748B] text-[16px] font-medium"
                                        >
                                            Priority
                                        </p>

                                        <button
                                            class="border-none pb-1 bg-[#EF4444] rounded-full text-white py-0 px-3"
                                        >
                                            ${issue.priority}
                                        </button>
                                    </div>
                                </div>
                            </div>






<div class="modal-action">
                                <form method="dialog">
                                    <button class="btn">Close</button>
                                </form>
                            </div>

       
    `;

    document.getElementById("issue_modal").showModal();
};

document.getElementById("btn-search").addEventListener("click", () => {
    const value = document
        .getElementById("input-search")
        .value.trim()
        .toLowerCase();

    const filtered = allIssuesData.filter(
        (issue) =>
            issue.title.toLowerCase().includes(value) ||
            issue.description.toLowerCase().includes(value),
    );

    renderIssues(filtered);
});

const manageSpinner = (status) => {
    const spinner = document.getElementById("spinner");

    if (status) {
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
};

loadIssue();
