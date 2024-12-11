lines = File.readlines('input/day03.txt').map(&:chomp)

sums = Array.new(12, 0)
lines.each do |line|
  line.split(//).each_with_index do |s, i|
    sums[i] += s.to_i
  end
end
gamma = sums.map { |n| n > 1000 / 2 ? 1 : 0 }.join.to_i(2)
epsilon = sums.map { |n| n > 1000 / 2 ? 0 : 1 }.join.to_i(2)
power = gamma * epsilon

$bin_arrs = lines.map { |l| l.split(//).map(&:to_i) }
def life_support(target)
  i = 0
  results = $bin_arrs.clone
  puts target == :most
  while results.length > 1
    sum = results.reduce(0) { |sum, n| sum + n[i] }
    most, least = sum < results.length / 2 ? [0, 1] : [1, 0]
    results = results.select do |n|
      n[i] == (target == 'most' ? most : least)
    end
    i += 1
  end
  results[0].join.to_i(2)
end

support = life_support('most') * life_support('least')

puts [power, support] # 1636063 too high
