<script setup>
const selectedCache = ref();
const caches = ref([
  { name: "4", code: 4 },
  { name: "8", code: 8 },
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
  var array2 = [];

  console.log("Beginning simulation");
  console.log("Cache is " + selectedCache.value.code);
  console.log("Memory is " + selectedMemory.value.code);
  //set up the blocks
  for (var i = 0; i < selectedMemory.value.code; i++) {
    array1.push({
      id: i,
      content: Math.random(),
    });

    console.log(i);
  }
  blocks.value = array1;
  console.log(blocks.value);

  console.log(array1);
  //set up lines
  for (var i = 0; i < selectedCache.value.code; i++) {
    array2.push({
      id: i,
      content: null,
    });
    console.log(i);
  }
  lines.value = array2;
  console.log(lines.value);
}

// function that performs modular arithmetic to determine data placement
const mapping = (event) => {
  const {
    data: { id, content },
  } = event;

  const lineNumber = id % lines.value.length;
  lines.value[lineNumber].content = content;
};
</script>

<template>
  <div>
    <div class="flex">
      <!-- Left menu -->
      <div class="relative mx-3 my-5 w-1/3 p-8">
        <!-- Declaring sizes -->
        <span class="font-bold"> Declaring Sizes: </span>
        <hr class="my-3 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <div class="flex-col space-y-4">
          <div class="flex justify-between space-x-3">
            <label name="Cache Size" class="font-medium"
              >Cache Size <font size="-4">(power of 2)</font></label
            >
            <div class="card justify-content-center flex">
              <Dropdown
                v-model="selectedCache"
                :options="caches"
                optionLabel="name"
                placeholder="Select Cache"
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
            class="w-full"
            label="Set up Simulation"
          />
          <!-- <Button
            @click="reset"
            class="w-full"
            label="Reset Simulation"
            severity="warning"
          /> -->
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
          <span class="text-xl uppercase"> direct mapped cache </span>
        </h3>
        <!-- Contents of the memory, cache and output -->
        <div>
          <div class="flex justify-between space-x-20">
            <!-- Cache -->
            <div class="card">
              <span class="block text-center font-semibold capitalize"
                >Cache</span
              >
              <DataTable
                :value="lines"
                showGridlines
                class="p-datatable-sm"
                tableStyle="min-width: 1rem"
              >
                <Column field="id" header="Address"></Column>
                <Column field="content" header="Data"></Column>
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
