class Investor(): # client side functions
	name = ""
	tokens = 0
	portfolio = dict()

	def deposit(str name, int usd): # to add tokens
		this.name = name
		tokens += usd

	def withdraw(int tokens): # to convert out to USD
		this.tokens -= tokens
		return tokens

	def sell(Channel channel, int minPrice, int num):
		Market.postSell(this, channel, minPrice, num)

	def buy(Channel channel,int askPrice, int num):
		Market.postBuy(this, channel, askPrice, num)

class Channel(Investor): # inherits from Investor
	marketCap = portfolio[name] * shareVal()

	# decide how many shares to split channel into
	def startChannel(str name, int shares):
		this.name = name
		portfolio[name] = shares

	# can only sell and buy shares of own channel
	def sellShares(int minPrice, int num):
		Market.postSell(super, this, minPrice, num)

	def buyShares(int askPrice, int num):
		Market.postBuy(super, this, askPrice, num)

class Market(): # this is the server
	sell = {} # {channel:[[seller, minPrice, num],[seller2, minPrice2, num2]]}
	buy = {} # {channel:[[buyer, askPrice, num],[buyer2, askPrice2, num2]]}

	def postSell(Investor seller, Channel channel, int minPrice, int num):
		for i in buy[channel]:
			buyEntry = buy[channel][i]
			if minPrice < buyEntry[1]: # if minPrice < askPrice
				seller.portfolio[channel] -= buyEntry[2]
				buyEntry[0].portfolio[channel] += buyEntry[2]
				# transfer buyer's num amount of shares of channel from seller to buyer
				buyEntry[0].tokens -= buyEntry[1]
				seller.tokens += buyEntry[1]
				# transfer buyer's askPrice amount of tokens from buyer to seller
				return "Succesful sale"
		sell[channel].append([seller, minPrice, num])
		return "Posted to market, waiting for purchase"

	def postBuy(Investor buyer, Channel channel, int askPrice, int num):
		for i in sell[channel]: # shares to be sold
			sellEntry = sell[channel][i]
			if askPrice > sellEntry[1]: # if askPrice > minPrice
				sellEntry[0].portfolio[channel] -= sellEntry[2]
				buyer.portfolio[channel] += sellEntry[2]
				# transfer num amount of shares of channel from seller to buyer
				buyer.tokens -= askPrice
				sellEntry[0].tokens += askPrice
				# transfer askPrice amount of tokens from buyer to seller
				return "Succesful purchase"
		buy[channel].append([buyer, askPrice, num])
		# if no sell that meets criteria is found, post to buy dict
		return "Posted to market, waiting for sale"