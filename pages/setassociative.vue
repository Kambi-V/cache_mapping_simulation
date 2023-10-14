<script setup>
const selectedSet = ref();
const sets = ref([
  { name: "2", code: 2 },
  { name: "4", code: 4 },
]);

const selectedSetSize = ref();
const setsizes = ref([
  { name: "2", code: 2 },
  { name: "4", code: 4 },
]);

const selectedMemory = ref();
const memories = ref([
  { name: "8", code: 8 },
  { name: "16", code: 16 },
]);

const blocks = ref();
const lines = ref();

function simulation() {
  var array1 = [];
  var array2 = new Array(selectedSet.value.code);

  //set up the blocks
  for (var i = 0; i < selectedMemory.value.code; i++) {
    array1.push({
      id: i,
      content: Math.random(),
    });
  }
  blocks.value = array1;
  // set up cache set size

  for (let i = 0; i < selectedSet.value.code; i++) {
    array2[i] = new Array(selectedSetSize.value.code);
    for (let j = 0; j < selectedSetSize.value.code; j++) {
      array2[i][j] = {
        id: j,
        key: null,
        value: null,
        timestamp: new Date(),
      };
    }
  }

  lines.value = array2;
  console.log(lines.value);
}

// function that performs mapping on the cache
const mapping = (event) => {
  const {
    data: { id, content },
  } = event;

  // modular arithmetic to identify the cache set to be mapped
  const setNumber = id % lines.value.length;

  const lruIndex = findLRU(setNumber);
  lines.value[setNumber][lruIndex].key = id;
  lines.value[setNumber][lruIndex].value = content;
  lines.value[setNumber][lruIndex].timestamp = new Date();
};

// function that describes cache placement policy
const findLRU = (setNumber) => {
  return lines.value[setNumber].reduce((lru, current, index, array) => {
    if (!array[lru].timestamp && !current.timestamp) {
      return index < lru ? index : lru;
    }
    if (!array[lru].timestamp) {
      return lru;
    }
    if (!current.timestamp) {
      return index;
    }
    return current.timestamp < array[lru].timestamp ? index : lru;
  }, 0);
};
</script>

<template>
  <div>
    <div class="flex justify-around">
      <!-- Left menu -->
      <div class="relative mx-3 my-5 w-1/3 p-8">
        <!-- Declaring sizes -->
        <span class="font-bold"> Declaring Sizes: </span>
        <hr class="my-3 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <div class="flex-col space-y-4">
          <div class="flex justify-between space-x-3">
            <label name="Cache Set" class="font-medium"
              >Number of Sets in the Cache
              <font size="-4">(power of 2)</font></label
            >
            <div class="card justify-content-center flex">
              <Dropdown
                v-model="selectedSet"
                :options="sets"
                optionLabel="name"
                placeholder="Select Cache Set"
                class="md:w-14rem w-full"
              />
            </div>
          </div>
          <div class="flex justify-between space-x-3">
            <label name="Set Size" class="font-medium"
              >Size of each Set in the Cache
              <font size="-4">(power of 2)</font></label
            >
            <div class="card justify-content-center flex">
              <Dropdown
                v-model="selectedSetSize"
                :options="setsizes"
                optionLabel="name"
                placeholder="Select Set Size"
                class="md:w-14rem w-full"
              />
            </div>
          </div>

          <div class="flex justify-between space-x-3">
            <label name="Cache Size" class="font-medium"
              >Memory Size <font size="-4">(power of 2)</font></label
            >
            <div class="card justify-content-center flex">
              <Dropdown
                v-model="selectedMemory"
                :options="memories"
                optionLabel="name"
                placeholder="Select Memory"
                class="md:w-14rem w-full"
              />
            </div>
          </div>
        </div>
        <div class="mt-6 justify-center space-y-3">
          <Button
            @click="simulation"
            class="w-full border p-4 border-blue"
            label="Set up Simulation"
          />
        </div>

        <div class="mt-3 space-y-2">
          <h3 class="text-xl font-bold text-cyan-950">
            Instructions on Mapping the cache
          </h3>

          <ul class="list-decimal">
            <li>Fill in the specifications for Cache and Main memory sizes</li>
            <li>
              After the tables are created, select the row desired from main
              memory to perform mapping
            </li>
          </ul>
        </div>
      </div>
      <!-- Right menu -->
      <div class="">
        <h3 class="items-center space-x-2 p-3 text-center text-xl">
          <Icon name="fa6-solid:sliders" class="text-xl" />
          <span class="text-xl uppercase"> set-associative mapped cache </span>
        </h3>
        <!-- Contents of the memory, cache and output -->
        <div>
          <div class="flex justify-between space-x-20">
            <!-- Cache -->
            <div class="card">
              <span class="block text-center font-semibold capitalize"
                >Cache</span
              >
              <DataTable :value="lines" class="p-datatable-sm">
                <Column header="Set">
                  <template #body="slotProps">
                    {{ slotProps.index }}
                  </template>
                </Column>
                <Column header="Lines">
                  <template #body="slotProps">
                    <DataTable :value="slotProps.data" class="p-datatable-sm">
                      <Column field="id" header="ID"></Column>
                      <Column field="key" header="Key"></Column>
                      <Column field="value" header="Value"></Column>
                    </DataTable>
                  </template>
                </Column>
              </DataTable>
            </div>

            <!-- Main Memory -->
            <div class="card">
              <span class="block text-center font-semibold capitalize"
                >Main Memory</span
              >
              <DataTable
                selectionMode="single"
                dataKey="id"
                :metaKeySelection="false"
                @rowSelect="mapping"
                :value="blocks"
                class="p-datatable-sm"
                showGridlines
                tableStyle="min-width: 1rem"
              >
                <Column field="id" header="Address"></Column>
                <Column field="content" header="Data"></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
