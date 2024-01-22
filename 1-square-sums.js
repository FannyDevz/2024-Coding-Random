//https://www.codewars.com/kata/5a667236145c462103000091/solutions/javascript

const squares = Array.from({length: 300}, (_,i) => (i+1)**2)

const getGraph = n => Array.from({length: n+1}, (_,i) => {
  if (i == 0) return [];
  return new Set(
    squares.filter(sq => i < sq && sq - i != i && sq - i <= n)
      .map(sq => sq-i)
  );
});

const updateGraph = (n, graph) => {
  const pairs = squares
    .filter(sq => n < sq && sq - n != n && sq - n <= n)
    .map(sq => sq-n);
  pairs.forEach(k => graph[k].add(n));
  graph.push(new Set(pairs));
  return graph;
};

const advanceSingle = (n, path, graph) => {
  if (path.length === n) return path;
  const last = path[path.length - 1]
  const neighbors = [...graph[last]];
  if (!graph[neighbors[0]]) return false;
  if (path.length !== (n-1) && graph[neighbors[0]].size === 1) return false;

  graph = graph.map(x => new Set(x));
  neighbors.forEach(n => graph[n].delete(last));
  graph[last] = new Set();

  let done = [];
  while (true) {
    const best_n = neighbors.reduce((acc, p) => {
      if (done.includes(p)) return acc;
      if (!acc) return [p, graph[p].size];
      return acc[1] > graph[p].size ? [p, graph[p].size] : acc;
    }, null);
    if (!best_n) return false;
    const res = advanceSingle(n, path.concat(best_n[0]), graph);
    if (res) return res;
    done.push(best_n[0]);
  }
};

let square_sums_row = n => {
  if (n === 1) return [1];
  if (n < 15 || (n >= 18 && n < 23) || n == 24) return false;
  if (n > 100) return sols[n];
  const graph = getGraph(n);
  const vertices = Array.from({length: n}, (_,i) => i+1)
    .sort((a,b) => graph[a].size - graph[b].size);
  for (v of vertices) {
    const res = advanceSingle(n, [v], graph);
    if (res) return res;
  }
  return false;
};

const attemptInsert = (n, path, new_segment, graph) => {
  const ns_corners = [new_segment[0], new_segment[new_segment.length-1]];
  if (graph[ns_corners[0]].has(path[0])) {
    return (new_segment.reverse()).concat(path);
  } else if ([...graph[ns_corners[0]]].includes(path[path.length-1])) {
    return path.concat(new_segment);
  } else if ([...graph[ns_corners[1]]].includes(path[0])) {
    return new_segment.concat(path);
  } else if ([...graph[ns_corners[1]]].includes(path[path.length-1])) {
    return path.concat(new_segment.reverse());
  }
  if (graph[path[0]].has(path[path.length-1])) {
    const partner = [...graph[new_segment[0]]][0];
    const p_index = path.indexOf(partner);
    return path.slice(p_index+1)
      .concat(path.slice(0, p_index+1))
      .concat(new_segment);
  }

  const lneighbors = [...graph[ns_corners[0]]].filter(x => path.includes(x));
  for (ne of lneighbors) {
    const n_index = path.indexOf(ne);
    if (graph[path[n_index-1]].has(ns_corners[1])) {
      return path.slice(0, n_index)
        .concat(new_segment.reverse())
        .concat(path.slice(n_index));
    }
    if (graph[path[n_index+1]].has(ns_corners[1])) {
      return path.slice(0, n_index+1)
        .concat(new_segment)
        .concat(path.slice(n_index+1));
    }
  }
  const rneighbors = [...graph[ns_corners[1]]].filter(x => path.includes(x));
  for (ne of rneighbors) {
    const n_index = path.indexOf(ne);
    if (graph[path[n_index-1]].has(ns_corners[0])) {
      return path.slice(0, n_index)
        .concat(new_segment)
        .concat(path.slice(n_index));
    }
    if (graph[path[n_index+1]].has(ns_corners[0])) {
      return path.slice(0, n_index+1)
        .concat(new_segment.reverse())
        .concat(path.slice(n_index+1));
    }
  }

  const random_neighbor = lneighbors[parseInt(Math.random()*lneighbors.length)];
  const rn_index = path.indexOf(random_neighbor);
  return attemptInsert(
    n,
    path.slice(0, rn_index+1).concat(new_segment),
    path.slice(rn_index+1),
    graph,
  );
};

let sols = [];
let global_graph = null;
(new Array(1301)).fill(0).forEach((x, i) => {
  if (i < 100) {
    const sol = square_sums_row(i);
    sols.push(sol);
  } else {
    if (!global_graph) global_graph = getGraph(i);
    else global_graph = updateGraph(i, global_graph);
    const sol = attemptInsert(i, sols[sols.length-1], [i], global_graph);
    sols.push(sol);
  }
});